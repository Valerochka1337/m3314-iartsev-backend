import { Injectable } from '@nestjs/common';

interface MenuItem {
  href: string;
  label: string;
  active: boolean;
}

interface SessionViewModel {
  isAuthenticated: boolean;
  userName: string;
  loginAction: string;
  logoutUrl: string;
  loginAuthValue: string;
  guestUserName: string;
}

interface ProjectCard {
  image: string;
  imageClass: string;
  alt: string;
  title: string;
  description: string;
}

interface GalleryItem {
  image: string;
  alt: string;
}

interface TeamMember {
  name: string;
  role: string;
  location: string;
}

interface BasePageViewModel {
  pageTitle: string;
  keywords: string;
  description: string;
  menuItems: MenuItem[];
  session: SessionViewModel;
  includeToastify: boolean;
  scripts: string[];
}

@Injectable()
export class AppService {
  private readonly menuTemplate: Omit<MenuItem, 'active'>[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/mycode', label: 'My code' },
    { href: '/constructor', label: 'Constructor' },
    { href: '/comments', label: 'Comments' },
  ];

  private readonly projectCards: ProjectCard[] = [
    {
      image: '/img/project1.jpg',
      imageClass: 'project_img_long',
      alt: 'Project 1',
      title: 'Project 1: Task Management System',
      description: 'This project is a task management system',
    },
    {
      image: '/img/project2.jpg',
      imageClass: 'project_img_short',
      alt: 'Project 2',
      title: 'Project 2: E-commerce Platform',
      description: 'This project is an e-commerce platform',
    },
  ];

  private readonly galleryItems: GalleryItem[] = [
    { image: '/img/project3.jpg', alt: 'Project 3' },
    { image: '/img/project4.jpg', alt: 'Project 4' },
    { image: '/img/project1.jpg', alt: 'Project 1' },
  ];

  private readonly teamMembers: TeamMember[] = [
    { name: 'Valerii', role: 'Backend Developer', location: 'Russia' },
    { name: 'Anna', role: 'Frontend Developer', location: 'Germany' },
    { name: 'John', role: 'Fullstack Developer', location: 'USA' },
  ];

  getIndexPageModel(auth?: string, user?: string) {
    return {
      ...this.buildBasePageModel({
        currentPath: '/',
        auth,
        user,
        pageTitle: 'Resume',
        keywords: 'resume, portfolio, programmer',
        description: 'resume, portfolio, programmer',
      }),
      aboutText:
        "Hey! I'm Valerii Yartsev, and I'm a junior backend developer. I specialize in backend development with Java. If you are interested in working with me, feel free to contact me!",
      projects: this.projectCards,
      galleryItems: this.galleryItems,
      teamMembers: this.teamMembers,
    };
  }

  getAboutPageModel(auth?: string, user?: string) {
    return {
      ...this.buildBasePageModel({
        currentPath: '/about',
        auth,
        user,
        pageTitle: 'About',
        keywords: 'about, resume, portfolio',
        description: 'about resume page',
      }),
      aboutText:
        "Hey! I'm Valerii Yartsev, and I'm a junior backend developer. I specialize in backend development with Java. If you are interested in working with me, feel free to contact me!",
    };
  }

  getProjectsPageModel(auth?: string, user?: string) {
    return {
      ...this.buildBasePageModel({
        currentPath: '/projects',
        auth,
        user,
        pageTitle: 'Projects',
        keywords: 'projects, portfolio',
        description: 'projects page',
      }),
      projects: this.projectCards,
      galleryItems: this.galleryItems,
    };
  }

  getMyCodePageModel(auth?: string, user?: string) {
    return {
      ...this.buildBasePageModel({
        currentPath: '/mycode',
        auth,
        user,
        pageTitle: 'My code',
        keywords: 'code, table, portfolio',
        description: 'code and table page',
      }),
      teamMembers: this.teamMembers,
    };
  }

  getConstructorPageModel(auth?: string, user?: string) {
    return {
      ...this.buildBasePageModel({
        currentPath: '/constructor',
        auth,
        user,
        pageTitle: 'Constructor',
        keywords: 'table, constructor, schedule',
        description: 'table constructor for schedule',
        scripts: ['/script/constructor.js'],
      }),
    };
  }

  getCommentsPageModel(auth?: string, user?: string) {
    return {
      ...this.buildBasePageModel({
        currentPath: '/comments',
        auth,
        user,
        pageTitle: 'Comments',
        keywords: 'comments, api, toastify',
        description: 'comments page',
        includeToastify: true,
        scripts: ['/script/comments.js'],
      }),
    };
  }

  private buildBasePageModel(params: {
    currentPath: string;
    auth?: string;
    user?: string;
    pageTitle: string;
    keywords: string;
    description: string;
    includeToastify?: boolean;
    scripts?: string[];
  }): BasePageViewModel {
    return {
      pageTitle: params.pageTitle,
      keywords: params.keywords,
      description: params.description,
      menuItems: this.buildMenuItems(params.currentPath, params.auth, params.user),
      session: this.buildSession(params.currentPath, params.auth, params.user),
      includeToastify: params.includeToastify ?? false,
      scripts: params.scripts ?? [],
    };
  }

  private buildMenuItems(
    currentPath: string,
    auth?: string,
    user?: string,
  ): MenuItem[] {
    const stateQuery = this.buildStateQuery(auth, user);

    return this.menuTemplate.map((item) => ({
      ...item,
      href: `${item.href}${stateQuery}`,
      active: item.href === currentPath,
    }));
  }

  private buildSession(
    currentPath: string,
    auth?: string,
    user?: string,
  ): SessionViewModel {
    const isAuthenticated = this.isAuthenticated(auth);
    const normalizedUser = this.normalizeUser(user);

    return {
      isAuthenticated,
      userName: normalizedUser,
      loginAction: currentPath,
      logoutUrl: `${currentPath}?auth=0`,
      loginAuthValue: '1',
      guestUserName: normalizedUser,
    };
  }

  private buildStateQuery(auth?: string, user?: string): string {
    if (!this.isAuthenticated(auth)) {
      return '';
    }

    const params = new URLSearchParams({ auth: '1' });
    const normalizedUser = this.normalizeUser(user);

    if (normalizedUser) {
      params.set('user', normalizedUser);
    }

    return `?${params.toString()}`;
  }

  private isAuthenticated(auth?: string): boolean {
    return auth === '1' || auth === 'true';
  }

  private normalizeUser(user?: string): string {
    const candidate = user?.trim();
    return candidate && candidate.length > 0 ? candidate : '';
  }
}
