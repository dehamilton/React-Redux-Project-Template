/* eslint-disable */
import { createAction } from 'redux-actions';
import * as actionConstants from 'constants/actionConstants';

export const initModule = createAction(actionConstants.MODULE_INITIALIZED);

function handleDescriptor(target, key, descriptor, [cacheable = false]) {
  const callback = descriptor.value;

  console.log('isCacheable', callback, arguments);
  return {
    ...descriptor,
    value() {
      const args = arguments;
      callback.apply(this, args);
    }
  };
}

function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  const keys = ['value', 'initializer', 'get', 'set'];

  for (let i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, []);
  } else {
    return function () {
      return handleDescriptor(...arguments, entryArgs);
    };
  }
}

export function isCacheable(...args) {
  return decorate(handleDescriptor, args);
}

class Test {
  @isCacheable(false)
  testCacheable(arg, arg2) {
    console.log('testCacheable', arg, arg2);
    return {
      type: actionConstants.TEST_TYPECHECK,
      arg,
      arg2,
    };
  }
}

// For testing basic grid functionality
const cacheableItems = {
  loadData() {
    const t = new Test();
    t.testCacheable(1, 2);
    return {
      type: actionConstants.MODULE_LOAD_DATA,
      data: [
        { id: '1', name: 'Test Row 1', lastEditedUtc: '2016-09-12T18:25:30.907', __selected: false },
        { id: '2', name: 'Test Row 2', lastEditedUtc: '2016-09-13T18:25:30.907', __selected: false },
        { id: '3', name: 'Test Row 3', lastEditedUtc: '2016-09-14T18:25:30.907', __selected: false },
        { id: '4', name: 'Test Row 4', lastEditedUtc: '2016-09-15T18:25:30.907', __selected: false },
        { id: '5', name: 'Test Row 5', lastEditedUtc: '2016-09-16T18:25:30.907', __selected: false },
      ],
    };
  },
  testTypecheck(arg, arg2) {
    return {
      type: actionConstants.TEST_TYPECHECK,
      arg,
      arg2,
    };
  },
};

export const loadData = cacheableItems.loadData;
export const testTypecheck = cacheableItems.testTypecheck;
