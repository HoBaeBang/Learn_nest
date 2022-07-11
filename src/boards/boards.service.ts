import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./board-status.enum";
import { v1 as uuid } from "uuid";
import { CreateBoardDto } from "./dto/create-board.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { promises } from 'dns';
import { Board } from './board.entity';

@Injectable() //DI가 가능하게 해주는 데코레이션
export class BoardsService {

  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository) {
  };

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id); //await을 이용하여서 DB작업이 끝난후에 값을 받을 수 있도록 한다.
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) { //delete했을때의 상태값? 정도로 생각됨.
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log(`result`, result);

    /*remove delete의 메서드를 모두 지원한다 remove는 무조건 존재하는 아이템을 지워야한다 그렇지 않으면 에러가 발생한다.
    delete의 경우에는 존재하면 지우고 존재하지 않으면 아무런 영향이 없다.*/
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    console.log(id, status);
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  // private boards: Board[] = [];
  //
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     // title: createBoardDto.title,
  //     // description: createBoardDto.description,
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }
  //
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id); //filter 남길 조건을 알려줘야함
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

}
