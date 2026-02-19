import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  pngFile?: string;
  pngClassName?: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Frontend',
    pngFile: require('@site/static/img/frontendSchooner.png').default,
    pngClassName: styles.featurePngLarge,
    description: (
      <>
        Learn how the frontend uses React to build the user interface.
      </>
    ),  
  },
  {
    title: 'Backend',
    pngFile: require('@site/static/img/backendBoomer.png').default,
    description: (
      <>
        Learn how the registration system uses MongoDB to store user data.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({title, Svg, pngFile, pngClassName, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
        {pngFile && <img src={pngFile} className={pngClassName || styles.featureSvg} alt={title} />}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
