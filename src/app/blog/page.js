import Container from '../components/container';
import Image from 'next/image';
import Link from 'next/link';
import { comfortaa } from '../fonts';

async function fetchPosts() {
  const res = await fetch('https://naydenova.art/cms/wp-json/wp/v2/posts?_embed=wp:featuredmedia');
  const posts = await res.json();
  return posts;
}

const Blog = async () => {
  const posts = await fetchPosts();

  return (
	<Container className="grid grid-cols-12 gap-8 pt-12 pb-24">
    <div className="grid grid-cols-2 gap-8 col-start-3 col-end-11">
      {posts.map(post => <BlogPost title={post.title.rendered} imageUrl={post['_embedded']['wp:featuredmedia'][0]['source_url']} slug={post.slug} desc={post.excerpt.rendered} key={post.id} />)}
    </div>
  </Container>
  );
};

const BlogPost = ({slug, imageUrl, title, desc}) => (
  <div>
    <Image className="mb-6" src={imageUrl} alt="thumbnail" width={596} height={336} />
    <Link href={`/blog/${slug}`} className={`${comfortaa.className} block text-2xl font-semibold text-teal-800 hover:text-teal-950 transition mb-2`}>{title}</Link>
    <div dangerouslySetInnerHTML={{__html: desc}} />
  </div>
);

export default Blog;