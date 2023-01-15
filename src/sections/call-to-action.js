/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Box, Heading, Button } from 'theme-ui';

import BgShape from 'assets/images/shape-1.svg';
import shapeTop from 'assets/images/icons/shape-top.png';
import shapeBottom from 'assets/images/icons/shape-bottom.png';

const CallToAction = () => {
  return (
    <section sx={styles.section}>
      <Container sx={styles.container}>
        <Box sx={styles.contentBox}>
          <Heading sx={styles.heading}>
            Do you have any question? Feel free to contact us
          </Heading>
          <Box sx={styles.btnWrapper}>
            <Button variant="text">Contact us now</Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
};
export default CallToAction;

const styles = {
  section: {
    position: 'relative',
    zIndex: 1,
    ':before': {
      backgroundColor: '#F9FAFC',
      bottom: 0,
      content: `''`,
      height: '50%',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: '-1',
    },
  },
  container: {
    px: [0, '0 !important', '30px !important'],
  },
  contentBox: {
    padding: [
      '35px 60px 60px',
      null,
      null,
      '40px 30px 45px',
      '55px 30px 60px',
      '55px 50px 60px',
    ],
    backgroundColor: '#183656',
    backgroundImage: ['none', null, null, `url(${BgShape})`],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '60% center',
    backgroundSize: ['120px', null, null, null, 'auto'],
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    textAlign: ['center', null, null, 'left'],
    flexDirection: ['column', null, null, 'row'],
    justifyContent: ['center', null, null, 'space-between'],
  },
  heading: {
    fontSize: [3, 7, 8, 7, 11],
    fontFamily: 'Bree Serif, serif',
    color: 'white',
    letterSpacing: 'heading',
    lineHeight: [1.4, 1.53],
    maxWidth: ['100%', '80%', null, 340, '50%', '45%'],
    mb: [11, null, null, 0],
  },
  btnWrapper: {
    display: 'flex',
    position: 'relative',
    ':before, :after': {
      content: `''`,
      position: 'absolute',
      width: '73px',
      height: '26px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundSize: ['55%', null, null, '100%'],
    },
    ':before': {
      backgroundImage: `url(${shapeTop})`,
      top: '-28px',
    },
    ':after': {
      backgroundImage: `url(${shapeBottom})`,
      bottom: '-28px',
    },
    button: {
      backgroundColor: 'white',
      padding: 0,
      fontSize: [0, null, null, null, 2],
      minHeight: [40, null, null, 45, 60],
      padding: ['0 28px', null, null, null, '0 40px'],
      textTransform: 'uppercase',
    },
  },
};
