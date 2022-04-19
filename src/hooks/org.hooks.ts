import { useQuery } from 'react-query';
import { OrganizationInfo } from '../types';

const getOrgDetails = async (orgId: number): Promise<OrganizationInfo> => {
  return {
    orgIcon: '/assets/red-dragon-gym.svg',
    orgName: 'RED DRAGON',
    orgCategory: 'Middleweight Category',
  };
};

export function useDFCOrganization(orgId: number) {
  return useQuery(['org', 'detais', orgId], () => getOrgDetails(orgId));
}
