/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import Masonry from 'react-masonry-component';
import SectionHeading from 'components/section-heading';
import FaqItem from 'components/cards/faq-item';

const data = [
  {
    id: 1,
    ques: 'How do i start using this service?',
    ans: `All you need is a web3 wallet. connect your wallet and start uploading your files and documents`,
  },
  {
    id: 2,
    ques: 'What type of files do you support?',
    ans: `We suppolrt all types olf files. Documents, Audiofiles, Video files, portable documemts, achive or compressed files. just mention them ].`,
  },
  {
    id: 3,
    ques: 'Do you support directory upload?',
    ans: `We currently support but single file upload and directory upload also known as folder upload.`,
  },
  {
    id: 4,
    ques: 'Is this service free?',
    ans: `This service is free for as much storage as you want. Thanks to Protocol lab. IPFS / Filecoin made this decentralized storege possib;le.`,
  },
  {
    id: 5,
    ques: 'How do I upgrade the storage capacity of my hosting plan?',
    ans: `You will contact our customer support for that.`,
  },
  {
    id: 6,
    ques: 'Can i ever look for my file?',
    ans: `Decentralized files cannot be brought down or missing. You files are stored on multiples nodes servers. All this servers are located in diffrent locations all over the globe. be rest assured that your files cannot just go down`,
  },
  {
    id: 7,
    ques: 'Where can i know more about this KEZAYYA?',
    ans: `We are putting up a comprehensive "Getting started documentamtion". meanwhile engage our support team on discord and do follow us on Twitter.`,
  },
];

const masonryOptions = { originTop: true };

const Faq = () => {
  return (
    <Box as="section" id="faq" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          slogan="Get yours question answer"
          title="Frequantly asked question"
        />
        <Masonry options={masonryOptions} sx={styles.grid}>
          {data.map((item) => {
            return <FaqItem key={item.id} faq={item} className="faq-item" />;
          })}
        </Masonry>
      </Container>
    </Box>
  );
};

export default Faq;

const styles = {
  section: {
    pt: [8, null, null, null, 10, 14],
    pb: [null, null, null, null, null, null, 10, 6],
  },
  grid: {
    mx: [null, null, null, -6, -8, 'unset'],
  },
};
