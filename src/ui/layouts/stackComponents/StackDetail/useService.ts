/* eslint-disable */

import { StackDetailRouteParams } from '.';
import {
  pipelinesActions,
  runPagesActions,
  stackComponentPagesActions,
  stackComponentsActions,
  stacksActions,
} from '../../../../redux/actions';
import {
  stackComponentSelectors,
  stackSelectors,
} from '../../../../redux/selectors';
import { useParams, useSelector } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { stackPagesActions } from '../../../../redux/actions';
import { useEffect, useState } from 'react';
import { filterObjectForParam } from '../../../../utils';
import { GetFlavorsListForLogo } from '../Stacks/List/GetFlavorsListForLogo';

interface ServiceInterface {
  stackComponent?: TStack;
  mapStackComponent: any;
  id: TId;
}

export const useService = (): ServiceInterface => {
  const dispatch = useDispatch();
  const { flavourList } = GetFlavorsListForLogo();
  const [mapStackComponent, setMapppedStackComponent] = useState([]);
  const { id } = useParams<StackDetailRouteParams>();
  const ITEMS_PER_PAGE = parseInt(
    process.env.REACT_APP_ITEMS_PER_PAGE as string,
  );
  const DEFAULT_ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setFetching(true);
    // Legacy: previously runs was in pipeline
    dispatch(
      stackComponentsActions.stackComponentForId({
        stackComponentId: id,
        onSuccess: (response) => {
          let temp: any = [];
          temp.push(response);
          const mappedComponent = temp.map((item: any) => {
            const temp: any = flavourList.find(
              (fl: any) => fl.name === item.flavor && fl.type === item.type,
            );
            if (temp) {
              return {
                ...item,
                flavor: {
                  logoUrl: temp.logo_url,
                  name: item.flavor,
                },
              };
            }
            return item;
          });

          setMapppedStackComponent(mappedComponent);
          setFetching(false);
        },
        onFailure: () => setFetching(false),
      }),
    );
    dispatch(
      stackComponentsActions.allRunsByStackComponentId({
        sort_by: 'desc:created',
        logical_operator: 'and',
        stackComponentId: id,
        page: 1,
        size: ITEMS_PER_PAGE ? ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }, [id, flavourList]);

  const setFetching = (fetching: boolean) => {
    dispatch(stackPagesActions.setFetching({ fetching }));
    dispatch(runPagesActions.setFetching({ fetching }));
  };

  // const stackComponent = useSelector(
  //   stackComponentSelectors.stackComponentForId(id),
  // );

  return { mapStackComponent, id };
};

export const callActionForStackComponentRunsForPagination = () => {
  const dispatch = useDispatch();
  // const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  // const { id } = useParams<PipelineDetailRouteParams>();
  function dispatchStackComponentRunsData(
    id: any,
    page: number,
    size: number,
    filters?: any[],
    sortby?: string,
  ) {
    const logicalOperator = localStorage.getItem('logical_operator');
    let filtersParam = filterObjectForParam(filters);
    console.log(page, size, 'page,size');
    // debugger;
    setFetching(true);
    dispatch(
      stackComponentsActions.allRunsByStackComponentId({
        sort_by: sortby ? sortby : 'created',
        logical_operator: logicalOperator ? JSON.parse(logicalOperator) : 'and',
        stackComponentId: id,
        page: page,
        size: size,
        filtersParam,
        onSuccess: () => setFetching(false),
        onFailure: () => setFetching(false),
      }),
    );
  }

  const setFetching = (fetching: boolean) => {
    dispatch(runPagesActions.setFetching({ fetching }));
  };
  return {
    setFetching,
    dispatchStackComponentRunsData,
  };
};
