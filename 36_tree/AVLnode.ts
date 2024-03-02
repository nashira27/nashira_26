class Marks
{
    mark: number;
    rightMarks: Marks | null;
    leftMarks: Marks | null;
    height: number;
    constructor(mark: number){
        this.mark =  mark;
        this.rightMarks = null;
        this.leftMarks = null;
        this.height = 1;
    }
}
export default Marks