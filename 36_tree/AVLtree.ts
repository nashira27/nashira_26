import Marks from "./AVLnode";

class MarksTree
{
    public rootMarks : Marks | null;
    constructor() {
        this.rootMarks = null;
    }

    public getHeight(node: Marks | null): number
    {
        return node ? node.height : 0;
    }

    //get tree height
    public getTreeheight(): number
    {
        return this.getHeight(this.rootMarks)
    }

    private updateHeight(node: Marks): void
    {
        node.height = 1+ Math.max(this.getHeight(node.leftMarks), this.getHeight(node.rightMarks))
    }

    private getBalanceFactor(node: Marks): number
    {
        return this.getHeight(node.leftMarks) - this.getHeight(node.rightMarks)
    }

    //Insertion
    public insertMarks(mark: number): void
    {
        this.rootMarks = this.insertMarkData(this.rootMarks, mark);
    }
    private insertMarkData(node: Marks | null, mark: number) : Marks
    {
        if (!node) {
            return new Marks(mark);
        } else if (mark < node.mark) {
            node.leftMarks = this.insertMarkData(node.leftMarks,mark);
            node;
        } 
        else if (mark >  node.mark) {
            node.rightMarks = this.insertMarkData(node.rightMarks,mark);
            node;
        } else {
            return node;
        }
        this.updateHeight(node);
        let balanceFactor: number = this.getBalanceFactor(node);
        
        if (balanceFactor > 1){
            let selectedNode = node.leftMarks as Marks;

            if (mark < selectedNode.mark) {
                return this.rightRotate(node);
            } else {
                node.leftMarks = this.leftRotate(node.leftMarks as Marks)
                return this.rightRotate(node)
            }
        } else if (balanceFactor < -1){
            let selectedNode = node.leftMarks as Marks;

            if (mark > selectedNode.mark) {
                return this.leftRotate(node);
            } else {
                node.rightMarks = this.rightRotate(node.leftMarks as Marks)
                return this.leftRotate(node)
            }
        } 
        return node;
    }
    private rightRotate(node: Marks): Marks{
        let x: Marks = node.leftMarks as Marks;
        let T2 = x.rightMarks as Marks;
        x.rightMarks = node;
        node.leftMarks = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }
    private leftRotate(node: Marks): Marks{
        let x: Marks = node.rightMarks as Marks;
        let T2 = x.leftMarks as Marks;
        x.rightMarks = node;
        node.leftMarks = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }

    //Search function
    public searchMarks(mark: number): Boolean {
        const result = this.searchMarkData(this.rootMarks, mark);
        if (result) {
            return true;
        }
        return false;
        
    }
    private searchMarkData(node: Marks |  null, mark: number) : Marks | null{
        if (node === null)  {
            return null;
        } else if (node.mark === mark){
            return node;
        }

        if (mark < node.mark){
            return this.searchMarkData(node.leftMarks, mark);
        } else {
            return this.searchMarkData(node.rightMarks, mark);
        }
    }

    //Deletion
    public deleteMarks(mark: number): void{
        this.rootMarks = this.deleteMarkData(this.rootMarks, mark);
    }
    private deleteMarkData(node: Marks|null, mark: number): Marks |null {
        if (node === null){
            return null;
        }
        if (mark < node.mark){
            node.leftMarks = this.deleteMarkData(node.leftMarks, mark)
        } else if (mark > node.mark){
            node.rightMarks = this.deleteMarkData(node.rightMarks, mark) 
        } else {
            //node is found
            if (node.rightMarks === null && node.leftMarks === null){
                node = null;
            } else if (node.leftMarks=== null){
                node = node.rightMarks;
            } else if (node.rightMarks=== null){
                node = node.leftMarks
            } else{
                const successor = this.findMinNode(node.rightMarks);
                node.mark = successor.mark;
                node.rightMarks = this.deleteMarkData(node.rightMarks, successor.mark)
            }
        }
        return node;
    }
    private findMinNode(node: Marks): Marks{
        while (node.leftMarks!== null){
            node = node.leftMarks;
        }
        return node;
    }

    // Count nodes
    public countNodes(): number{
        const result: number[]=[];
        this.helper(this.rootMarks, result);
        return result.length
    }

    private helper(node: Marks, result:number[]): void{
        if (node){
            this.helper(node.leftMarks, result);
            result.push(node.mark);
            this.helper(node.rightMarks,result)
        }
    }
}

const avl = new MarksTree();
avl.insertMarks(3);
avl.insertMarks(10);
avl.insertMarks(2);
avl.insertMarks(15);
avl.insertMarks(25);
console.log(avl)