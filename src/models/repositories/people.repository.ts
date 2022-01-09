import {EntityRepository, getConnection, Repository} from "typeorm";
import {PeopleEntity} from "../entities/people.entity";

export function getPeopleRepository() {
    const conn = getConnection();
    return conn.getCustomRepository(PeopleRepository);
}

@EntityRepository(PeopleEntity)
export class PeopleRepository extends Repository<PeopleEntity>{

}