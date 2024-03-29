import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.connectMicroservice({
		transport: Transport.TCP,
		options: {
			port: 4444
		}
	});
	await app.startAllMicroservices();
	await app.listen(4444);

}
bootstrap();
