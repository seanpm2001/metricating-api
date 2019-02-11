import Period from '../models/period'
import Task from '../models/task'
import TaskStatus from '../models/taskStatus'
import LeadtimeInMemoryRepository from './leadtime.memory.repository'
import DataBase from './inmemory.database'

const initializeRepository = function () {
    const dataBase = new DataBase()
    const leadtimeRepository = new LeadtimeInMemoryRepository({ dataBase })
    dataBase.initialize({ tasks: [
        new Task({ id: 1, issueType: 'Bug', dateEnd: new Date(2018, 11, 12), status: 'done', projectId: 1, transitions: [
            new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
            new TaskStatus({ taskId: 1, status: 'DOING', createDate: new Date(2018, 11, 11) }),
            new TaskStatus({ taskId: 1, status: 'DONE', createDate: new Date(2018, 11, 12) })]}),
        new Task({ id: 2, issueType: 'Bug', dateEnd: undefined, status: 'doing', projectId: 1, transitions: [
            new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
            new TaskStatus({ taskId: 1, status: 'DOING', createDate: new Date(2018, 11, 11) })]}),
        new Task({ id: 3, issueType: 'Bug', dateEnd: undefined, status: 'doing', projectId: 1, transitions: [
            new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) }),
            new TaskStatus({ taskId: 1, status: 'DOING', createDate: new Date(2018, 11, 24) })]}),
        new Task({ id: 4, issueType: 'Bug', dateEnd: undefined, status: 'doing', projectId: 1, transitions: [
            new TaskStatus({ taskId: 1, status: 'BACKLOG', createDate: new Date(2018, 11, 3) })]})
    ]})
    return leadtimeRepository
}

it('when find without data, then return empty array', async () => {
    const period = new Period('2018W50', '2018W51')
    const leadtimeRepository = new LeadtimeInMemoryRepository({ dataBase: new DataBase() })

    const tasks = await leadtimeRepository.find(1, period, true)

    expect(tasks).toBeDefined()
    expect(tasks).toHaveLength(0)
})

it('when finding with a period of one week and onlyDone then return all done task withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const tasks = await initializeRepository().find(1, period, true)

    expect(tasks).toHaveLength(1)
})
it('when finding with a period of one week and wip then return all not done task withing this week', async () => {
    const period = new Period('2018W50', '2018W51')

    const tasks = await initializeRepository().find(1, period, false)

    expect(tasks).toHaveLength(1)
})