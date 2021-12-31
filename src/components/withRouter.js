import React, { useMemo } from 'react';
import {
  useNavigate, useParams, useLocation, useSearchParams
} from 'react-router-dom';

const withRouter = (WrappedComponent) => React.forwardRef((props, ref) => {
  const location = useLocation();
  const searchParams = useSearchParams();

  const navigate = useNavigate();
  const params = useParams();

  const router = useMemo(
    () => {
      return {
        location,
        searchParams,
        navigate,
        params
      };
    },
    [
      location,
      searchParams,
      navigate,
      params
    ]
  );

  return (
    <WrappedComponent
      {...props}
      ref={ref}
      router={router}
    />
  );
});

export default withRouter;
