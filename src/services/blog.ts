import { prisma } from './database';
import { BlogPost } from '@/types/blog';

export class BlogService {
  static async getAllPosts(): Promise<BlogPost[]> {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }

  static async createPost(data: {
    title: string;
    slug: string;
    content: string;
  }): Promise<BlogPost> {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
      },
    });

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }

  static async updatePost(
    id: string,
    data: {
      title?: string;
      slug?: string;
      content?: string;
    }
  ): Promise<BlogPost | null> {
    const post = await prisma.post.update({
      where: { id },
      data,
    });

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }

  static async deletePost(id: string): Promise<boolean> {
    try {
      await prisma.post.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  static async postExists(slug: string): Promise<boolean> {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });
    return !!post;
  }
}
