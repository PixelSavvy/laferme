import { Helmet, HelmetData } from 'react-helmet-async';

type THeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export const Head = ({ title = '', description = '' }: THeadProps) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title}` : undefined}
      defaultTitle="ლა ფერმე"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
