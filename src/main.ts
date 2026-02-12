import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { registerHbsPartials } from './hbs.utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const publicPath = join(__dirname, '..', 'public');
  const viewsPath = join(__dirname, '..', 'views');
  const partialsPath = join(viewsPath, 'partials');

  app.useStaticAssets(publicPath, {
    index: false,
  });
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('hbs');
  registerHbsPartials(partialsPath);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
