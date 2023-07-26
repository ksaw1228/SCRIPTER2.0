import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.status-enum";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOption = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase()

        if(!this.isStatusVaild(value)){
            throw new BadRequestException(`${value} isn't right value`)
        }

        return value
    }
    private isStatusVaild(status:any){
        const index = this.StatusOption.indexOf(status)
        return index !== -1
    }
}