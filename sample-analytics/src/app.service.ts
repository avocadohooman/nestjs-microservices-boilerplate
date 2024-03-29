import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
	private readonly analytics: any[] = [];

	getHello(): string {
		return 'Hello World!';
	}
	
	handleUserCreated(payload: CreateUserEvent) {
		console.log('handleUserCreated', payload);
		this.analytics.push({
			email: payload.email,
			timestamp: new Date(),
		});
	}

	getAnalytics() {
		return this.analytics;
	}
}
