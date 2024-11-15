import Image from 'next/image';
import Container from '@/app/components/container';
import config from '@/app/config';

const BlogDetails = async ({params}) => {
  const [ post ] = await fetchPostDetails(params.slug);

  return (
    <Container>
      <div className="prose mx-auto pt-12 pb-24">
        <h1>{post.title.rendered}</h1>
        <Image alt={`${post.title.rendered} featured image`} src={post['_embedded']['wp:featuredmedia'][0]['source_url']} width="584" height="282" />
        <div className="text-justify" dangerouslySetInnerHTML={{__html: post.content.rendered}} />
      </div>
    </Container>
  );
}

async function fetchPostDetails(slug) {
  const res = await fetch(`${config.apiUrl}/wp/v2/posts?_embed=wp:featuredmedia&slug=${encodeURIComponent(slug)}&per_page=100`);
  const posts = await res.json();
  return posts;
}

async function fetchPostSlugs() {
  const res = await fetch(`${config.apiUrl}/wp/v2/posts?_fields=slug&per_page=100`);
  const posts = await res.json();
  return posts;
}

export async function generateStaticParams() {
  const posts = await fetchPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default BlogDetails;
