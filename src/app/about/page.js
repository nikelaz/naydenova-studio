import Container from '../components/container';
import Image from 'next/image';
import config from '../config';

async function fetchPageData() {
  const res = await fetch(`${config.apiUrl}/wp/v2/pages?slug=about&_embed`);
  const data = await res.json();
  return data[0];
}

const About = async () => {
  const page = await fetchPageData();

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 pt-12 pb-24">
      <Image
        className="xl:col-start-2 xl:col-end-6"
        src={page['_embedded']['wp:featuredmedia'][0].source_url}
        alt=""
        width={450}
        height={600}
      />
      <div className="xl:col-start-6 xl:col-end-11 prose max-w-none">
        <h1>{page.title.rendered}</h1>
        <div className="text-justify" dangerouslySetInnerHTML={{__html: page.content.rendered}} />
      </div>
    </Container>
  );
}

export default About;