import Project from '../models/project'
import ProjectRepository from '../repositories/project.repository'
import ProjectService from './project.service'

describe('Create new Project', () => {
    it('when find project return null and given a new project name, then create new project', async () => {
        let project = new Project({ name: 'project-name', issueTracking: 'jira', statusDone: 'cardEnding' })
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => null)
        jest.spyOn(projectRepository, 'save').mockImplementation(async () => {
            project.id = 1
            return project
        })

        const projectService = new ProjectService({ projectRepository })

        project = await projectService.create(project)

        expect(project.id).not.toBeNull()
        expect(project.id).not.toBeUndefined()
        expect(project.name).toBe('project-name')
        expect(project.issueTracking).toBe('jira')
        expect(project.statusDone).toBe('cardEnding')
    })

    it('when find project return undefined and given a new project name, then create new project', async () => {
        let project = new Project({ name: 'project-name', issueTracking: 'jira', statusDone: 'cardEnding' })
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => undefined)
        jest.spyOn(projectRepository, 'save').mockImplementation(async () => {
            project.id = 1
            return project
        })

        const projectService = new ProjectService({ projectRepository })

        project = await projectService.create(project)

        expect(project.id).not.toBeNull()
        expect(project.id).not.toBeUndefined()
        expect(project.name).toBe('project-name')
        expect(project.issueTracking).toBe('jira')
        expect(project.statusDone).toBe('cardEnding')
    })

    it('given a exists project name when create, then throw Exits exception', async () => {
        const project = new Project({ name: 'project-name', issueTracking: 'jira', statusDone: 'done' })
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async (name) => {
            return new Project(name, '')
        })

        const projectService = new ProjectService({ projectRepository })
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The project project-name is alreade exists'))
    })

    it('given project with null name then throw argument exception', async () => {
        const project = new Project({ name: null, issueTracking: 'jira', statusDone: 'done' })

        const projectService = new ProjectService({})
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })

    it('given project with undefined name then throw argument exception', async () => {
        const project = new Project({ name: undefined, issueTracking: 'jira', statusDone: 'done' })

        const projectService = new ProjectService({})
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })

    it('given project with empty name then throw argument exception', async () => {
        const project = new Project({ name: '', issueTracking: 'jira', statusDone: 'done' })

        const projectService = new ProjectService({})
        let error
        try {
            await await projectService.create(project)
        } catch (e) {
            error = e
        }

        expect(error).toEqual(new Error('The name of project is requiered'))
    })
})

describe('Get Project', () => {
    it('when getProject with exits name, then retunr project', async () => {
        const project = new Project({ name: 'project-name', issueTracking: 'jira', statusDone: 'done' })
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => {
            return project
        })

        const projectService = new ProjectService({ projectRepository })
        const getProject = await projectService.getProject('project-name')

        expect(getProject).toEqual(project)
    })

    it('when getProject with not exits name, then retunr undefined', async () => {
        const projectRepository = new ProjectRepository()
        jest.spyOn(projectRepository, 'find').mockImplementation(async () => {
            return undefined
        })

        const projectService = new ProjectService({ projectRepository })
        const getProject = await projectService.getProject('project-name')

        expect(getProject).toEqual(undefined)
    })

    it('when getProject with null projectName then return error', async () => {
        const projectService = new ProjectService({ })
        try {
            await projectService.getProject(null)
        } catch (error) {
            expect(error).toEqual(new Error('The name of project is requiered'))
        }
    })

    it('when getProject with empty projectName then return error', async () => {
        const projectService = new ProjectService({ })
        try {
            await projectService.getProject('')
        } catch (error) {
            expect(error).toEqual(new Error('The name of project is requiered'))
        }
    })

    it('when getProject with undefined projectName then return error', async () => {
        const projectService = new ProjectService({ })
        try {
            await projectService.getProject(undefined)
        } catch (error) {
            expect(error).toEqual(new Error('The name of project is requiered'))
        }
    })
})