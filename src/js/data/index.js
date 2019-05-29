import Resource from './class/resource';
import devil_raw_data from './devil_raw_data';
import skill_raw_data from './skill_raw_data';

const resource = new Resource(devil_raw_data, skill_raw_data);

export default resource;