import { Helmet, HelmetData } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
  noIndex?: boolean;
};

const helmetData = new HelmetData({});

export const Head = ({ title = '', description = '', noIndex = false }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | Nguyen Minh Toan` : undefined}
      defaultTitle='Nguyen Minh Toan — Full-Stack Developer'
    >
      {description && <meta name='description' content={description} />}
      {noIndex && <meta name='robots' content='noindex, nofollow' />}
    </Helmet>
  );
};
