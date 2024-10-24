import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Shop",
  description: "We sell the best product of electronics",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta;
