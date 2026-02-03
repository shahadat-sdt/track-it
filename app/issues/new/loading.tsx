import {Box} from "@radix-ui/themes";
import {Skeleton} from "@/app/components";



const LoadingNewIssuePage = () => {
 return (
    <Box>
        <Skeleton />
        <Skeleton height='5rem'/>
    </Box>
  );
};

export default LoadingNewIssuePage;
