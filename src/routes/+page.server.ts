import type { PageServerLoad } from './$types';
import { projectsList } from '../projects';
import { compareDesc } from 'date-fns';

export const load: PageServerLoad = async () => {
	return { projects: projectsList.sort((a, b) => compareDesc(a.date, b.date)) };
};
