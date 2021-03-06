import { BoardsService } from "./boards.service";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Board } from './board.entity';
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    getAllBoard(): Promise<Board[]>;
    getBoardById(id: number): Promise<Board>;
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    getBoard(id: number): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
