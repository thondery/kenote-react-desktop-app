import  _ from 'lodash'

export const getReducers = (Reduxs) => {
  let Reducers = {}
  for (let e of _.keys(Reduxs)) {
    if (!/Reducer$/.test(e)) continue
    Reducers[_.upperFirst(e.replace(/Reducer$/, ''))] = Reduxs[e]
  }
  return Reducers
}