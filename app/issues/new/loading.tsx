import {Box} from "@radix-ui/themes";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
 return (
    <Box>
        <Skeleton />
        <Skeleton height='5rem'/>
    </Box>
  );
};

export default LoadingNewIssuePage;
