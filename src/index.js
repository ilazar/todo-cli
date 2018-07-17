require("regenerator-runtime/runtime");
require('./re-intro');

import { ItemStore } from './ItemStore';
import itemCli from './itemCli';

itemCli(new ItemStore());
