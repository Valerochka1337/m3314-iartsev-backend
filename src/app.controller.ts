import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getIndexPage(
    @Query('auth') auth?: string,
    @Query('user') user?: string,
  ): Record<string, unknown> {
    return this.appService.getIndexPageModel(auth, user);
  }

  @Get('about')
  @Render('about')
  getAboutPage(
    @Query('auth') auth?: string,
    @Query('user') user?: string,
  ): Record<string, unknown> {
    return this.appService.getAboutPageModel(auth, user);
  }

  @Get('projects')
  @Render('projects')
  getProjectsPage(
    @Query('auth') auth?: string,
    @Query('user') user?: string,
  ): Record<string, unknown> {
    return this.appService.getProjectsPageModel(auth, user);
  }

  @Get('mycode')
  @Render('mycode')
  getMyCodePage(
    @Query('auth') auth?: string,
    @Query('user') user?: string,
  ): Record<string, unknown> {
    return this.appService.getMyCodePageModel(auth, user);
  }

  @Get('constructor')
  @Render('constructor')
  getConstructorPage(
    @Query('auth') auth?: string,
    @Query('user') user?: string,
  ): Record<string, unknown> {
    return this.appService.getConstructorPageModel(auth, user);
  }

  @Get('comments')
  @Render('comments')
  getCommentsPage(
    @Query('auth') auth?: string,
    @Query('user') user?: string,
  ): Record<string, unknown> {
    return this.appService.getCommentsPageModel(auth, user);
  }
}
