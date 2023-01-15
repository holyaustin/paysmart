/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import Slider from 'react-slick';
import SectionHeading from 'components/section-heading';
import BlogPost from 'components/cards/blog-post';
import SlickArrow from 'components/slick-arrow';
import thumb1 from 'assets/images/blog/1.png';
import thumb2 from 'assets/images/blog/2.png';
import thumb3 from 'assets/images/blog/3.png';

const data = [
  {
    id: 1,
    title: 'Learn from how to host your site',
    thumbnail: thumb1,
    excerpt: `Brian Halligan knows that you need more than a great product to have a great brand with new features.`,
    slug: `#Learn more`,
  },
  {
    id: 2,
    title: 'Customize your domain hosting',
    thumbnail: thumb2,
    excerpt: `Brian Halligan knows that you need more than a great product to have a great brand with new features.`,
    slug: `#Learn more`,
  },
  {
    id: 3,
    title: 'Learn how to upload on cloud host',
    thumbnail: thumb3,
    excerpt: `Brian Halligan knows that you need more than a great product to have a great brand with new features.`,
    slug: `#Learn more`,
  },
];

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  nextArrow: <SlickArrow control="next" />,
  prevArrow: <SlickArrow control="prev" />,
  responsive: [
    {
      breakpoint: 100000,
      settings: 'unslick',
    },
    {
      breakpoint: 768,
      settings: {
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: 'unslick',
    },
  ],
};

const Blog = () => {
  return (
    <Box as="section" id="blog" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          slogan="Latest newsfeed"
          title="Our recent blog post that updated"
        />
        <Slider sx={styles.grid} {...settings}>
          {data?.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Blog;

const styles = {
  section: {
    pt: [12, null, null, 12, 15],
    pb: [6, null, null, 16, 10, 14],
  },
  heading: {
    mb: [8, null, null, null, 10],
  },
  grid: {
    display: 'grid',
    gap: [6, null, null, null, 6, 10],
    alignItems: 'flex-start',
    mx: [null, null, null, -3, 'unset'],
    gridTemplateColumns: ['repeat(1, 1fr)', null, null, null, 'repeat(3, 1fr)'],
    '.slick-arrow': {
      bottom: [null, null, null, -14, 'unset'],
    },
  },
};
