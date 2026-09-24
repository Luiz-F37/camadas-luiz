import { Request, Response, NextFunction } from 'express'
import { CompanyService } from '../services/company.service'
import { companyDTO } from '../dtos/company.dto'

export class CompanyController {
  constructor(private service: CompanyService) {}

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await this.service.findAll()
      res.json(companies)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const company = await this.service.findById(id)
      res.json(company)
    } catch (error) {
      next(error)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = companyDTO(req.body)
      const created = await this.service.create(dto)
      res.status(201).json(created)
    } catch (error) {
      next(error)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await this.service.remove(id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}