import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getMyStacksApi = ({
  component_id,
  workspace,
  sort_by,
  logical_operator,
  page,
  size,
  filtersParam,
  authenticationToken,
}: {
  component_id?: any;
  workspace: string;
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  filtersParam?: object;
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.Stacks.my(workspace)),
    params: {
      component_id,
      sort_by,
      logical_operator,
      page,
      size,
      ...filtersParam,
    },
    method: httpMethods.get,
    authenticationToken,
  });

export default getMyStacksApi;
