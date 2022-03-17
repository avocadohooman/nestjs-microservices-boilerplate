import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from './create-user.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {

	private readonly inMemoryUsersDB: CreateUserDTO[] = [];

	constructor(
		@Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
		@Inject('ANALYTICS') private readonly analyticsClient: ClientProxy) {}
	
	getHello(): string {
		return 'Hello World!';
	}

	createUser(createUser: CreateUserDTO) {
		this.inMemoryUsersDB.push(createUser);
		this.communicationClient.emit('userCreated', new CreateUserEvent(createUser.email)); 
		this.analyticsClient.emit('userCreated', new CreateUserEvent(createUser.email));
	}

	getAnalytics() {
		return this.analyticsClient.send({ cmd: 'getAnalytics'}, {});
	}
}
