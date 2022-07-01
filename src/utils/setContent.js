import { processTypes } from '../types/types';
import Spinner from '../components/spinner/Spinner';
import Skeleton from '../components/skeleton/Skeleton';
import Error from '../components/errorMessage/Error';

/**
 * @param { Object } props
 * @param { String } props.process
 * @param { JSX.Element } props.ViewComponent
 * @param { Object | null } props.data
 * @param { Function | null } props.uniqueLoadingBehavior
 * @returns { JSX.Element }
 */
export const setContent = (props = {}) => {
  const {
    uniqueLoadingBehavior,
    ViewComponent,
    process,
    data,
  } = props;

  switch (process) {
    case processTypes.loading:
      if (typeof uniqueLoadingBehavior === 'function') {
        return uniqueLoadingBehavior();
      } else {
        return <Spinner />
      }
    case processTypes.waiting:
      return <Skeleton />
    case processTypes.confirmed:
      return <ViewComponent data={data} />;
    case processTypes.error:
      return <Error />
    default:
      throw new Error('process type is not found');
  }
}