import { createHistory, useBasename } from 'history'

export const history = createHistory();

export function navigate (pathname) {
    history.push({pathname});
}
