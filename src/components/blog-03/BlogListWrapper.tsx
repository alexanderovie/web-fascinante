import { IBlogPost } from '@/interface';
import BlogList from './BlogList';

const BlogListWrapper = () => {
  // Placeholder blogs for now - we'll implement proper blog loading later
  const allBlogs: IBlogPost[] = [
    {
      tag: 'General',
      author: 'Fascinante Digital Team',
      authorImage: '/images/team/team-1.jpg',
      publishDate: new Date().toISOString(),
      title: 'Welcome to Our Blog',
      description: 'Welcome to our blog where we share insights about digital marketing and technology.',
      thumbnail: '/images/blog/blog-1.jpg',
      readTime: '2 min read',
      slug: 'welcome-to-our-blog',
      content: 'This is a placeholder blog post.'
    }
  ];

  return <BlogList blogs={allBlogs} />;
};

export default BlogListWrapper;
