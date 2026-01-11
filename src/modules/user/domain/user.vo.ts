export class Email {
    private emailAddress: string
    private static emailRegex = /^[^\s@]+(\.[^\s@]+)*@[^\s@]+(\.[^\s@]+)+$/;

    constructor(emailAddress: string) {
        this.emailAddress = emailAddress.trim().toLowerCase()
    }

    public static create(emailAddress: string): Email {
        if (!emailAddress || !emailAddress.match(Email.emailRegex)) {
            throw new Error("Invalid email address.");
        }
        return new Email(emailAddress);
    }

    public static fromPersistence(emailAddress: string): Email {
        return new Email(emailAddress.trim().toLowerCase());
    }

    get value() { return this.emailAddress }

    toString() { return this.emailAddress }
}

export class ProviderId {
    private providerId: string
    
    constructor(providerId: string) {
        this.providerId = providerId.trim()
    }
    
    public static create(providerId: string): ProviderId {
        this.validate(providerId);
        return new ProviderId(providerId);
    }

    public static fromPersistence(providerId: string): ProviderId {
        return new ProviderId(providerId.trim());
    }

    private static validate(providerId: string) {
        if (!providerId.startsWith('user_')) {
            throw new Error("Provider ID must start with 'user_' for Clerk provider.");
        }
        if (!/^[a-zA-Z0-9_]+$/.test(providerId)) {
            throw new Error("Clerk user ID must contain only letters, numbers, and underscores.");
        }
    }
    
    get value() { return this.providerId }
    
    toString() { return this.providerId }
}

export class ImageUrl {
    private imageUrl: string
    
    constructor(imageUrl: string) {
        this.imageUrl = imageUrl.trim()
    }
    
    public static create(imageUrl: string): ImageUrl {
        this.validate(imageUrl);
        return new ImageUrl(imageUrl);
    }

    public static fromPersistence(imageUrl: string): ImageUrl {
        return new ImageUrl(imageUrl.trim());
    }

    private static validate(imageUrl: string) {
        if (!imageUrl || imageUrl.trim().length === 0) {
            throw new Error("Image URL cannot be empty.");
        }
        try { new URL(imageUrl); } catch {
            throw new Error("Invalid URL format.");
        }

        if (!imageUrl.startsWith('http')) {
            throw new Error("Image URL must use HTTP or HTTPS.");
        }
    }
    
    get value() { return this.imageUrl }
    
    toString() { return this.imageUrl }
}
