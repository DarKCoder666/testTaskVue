import compData from './data/companies'
import contData from './data/contracts'
import Resource from './abstract_updated'

export class Companies extends Resource {
    constructor() {
        super(compData)
    }
}

export class Contracts extends Resource {
    constructor() {
        super(contData)
    }
}
