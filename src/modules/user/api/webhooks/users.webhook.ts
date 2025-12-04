import { Hono } from 'hono';
import { Webhook } from 'svix';
import { UserRepository } from '../../infrastructure/user.repository';
import { CreateUserByAuthProviderIdUseCase } from '../../application/command/create-user-by-AuthPrivider.usecase';
import { DeleteUserByAuthProviderIdUseCase } from '../../application/command/delete-user-by-AuthProvider.usecase';

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    [key: string]: any;
  };
};

const webhook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET || '');

const clerkWebhook = new Hono();

const userRepository = new UserRepository();
const createUserByAuthProviderIdUseCase = new CreateUserByAuthProviderIdUseCase(userRepository);
const deleteUserByAuthProviderIdUseCase = new DeleteUserByAuthProviderIdUseCase(userRepository);

clerkWebhook.post('/', async (c) => {
  try {
    // Get the raw body as text
    const rawBody = await c.req.text();
    
    // Get headers
    const svix_id = c.req.header('svix-id');
    const svix_timestamp = c.req.header('svix-timestamp');
    const svix_signature = c.req.header('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return c.text('Missing required headers', 400);
    }

    try {
      // Verify the webhook
      const event = webhook.verify(rawBody, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as ClerkWebhookEvent;

      console.log('Webhook verified:', event.type);
      
      // Process the event
      if (event.type === 'user.created' || event.type === 'user.updated') {
        await createUserByAuthProviderIdUseCase.execute({
          authProviderId: event.data.id,
          name: `${event.data.first_name || ''} ${event.data.last_name || ''}`.trim(),
          email: event.data.email_addresses?.[0]?.email_address,
        });
      } else if (event.type === 'user.deleted') {
        await deleteUserByAuthProviderIdUseCase.execute({authProviderId: event.data.id});
      }

      return c.text('Webhook processed successfully', 200);
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return c.text('Invalid signature', 401);
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return c.text('Error processing webhook', 500);
  }
});

export default clerkWebhook;