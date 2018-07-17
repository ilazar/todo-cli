require("regenerator-runtime/runtime");
require('./re-intro');

import { ItemStore } from './server/ItemStore';
import itemCli from './client/itemCli';

itemCli(new ItemStore());
