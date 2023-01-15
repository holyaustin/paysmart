/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import Service from 'components/cards/service';
import { transform } from 'framer-motion';

const services = [
  {
    title: 'Word Documents Storage',
    price: 'doc, docx, odt, etc'
  },
  {
    title: 'Speadshee Documents Storage',
    price: 'xls, xlsx, ods, etc'
  },
  {
    title: 'presentation Docunment Storage',
    price: 'ppt, pptx, odp, etc',
  },
  {
    title: 'Image file Storage',
    price: 'gif, jpg, png, webp, etc',
  },
  {
    title: 'Media file Storage',
    price: 'mp4, avi, mp3, hevc, etc ',
  },
  {
    title: 'compressed file storage',
    price: 'tar, zip, gzip, 7zip, rar, etc',
  },
  {
    title: 'portable file storage',
    price: 'pdf, PDF/VT, PDF Healthcare, PDF/X, PDF/A, etc ',
  },
  {
    title: 'Other file types',
    price: 'Anyother file type'
  },
];

const Services = () => {
  return (
    <Box as="section" id="services" sx={styles.section}>
      <Container>
        <SectionHeading
          slogan="Ideal solutions for you"
          title="Didn’t find your file type? Don't worry, Just upload it!"
        />
        <Box sx={styles.grid}>
          {services.map((service, i) => (
            <Service key={i} service={service} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;

const styles = {
  section: {
    pt: [8, null, null, null, 10, 12],
    pb: [12, null, null, null, null, 15],
  },
  grid: {
    gap: [3, null, null, 4],
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: [
      'repeat(2, 1fr)',
      null,
      null,
      'repeat(3, 1fr)',
      null,
      'repeat(4, 1fr)',
      'repeat(4, 300px)',
    ],
  },
};
