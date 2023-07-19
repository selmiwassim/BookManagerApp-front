import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { keyframes } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public books: Book[] = []; 
  public editBook!: Book;
  public deleteBook!: Book;
  public inputValue: any = {};
  public inputValueUpdated: any = {};
  public bookinst!: Book;
  public bookDel!: Book;
  public hidenBlock: boolean = true;
  public hidenUpdateBlock : boolean = true;
  public bookUpdate!: Book;


  constructor(private bookService: BookService){}

  ngOnInit(){
      this.getBooks();
  }


  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      {
        next: (response) => {
          this.books = response;
          console.log(this.books);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 

      }
    );
  }

  public createBlock() {
    // Perform block creation logic here
    console.log(this.inputValue);
    this.bookinst = this.inputValue
    this.bookService.addBook(this.bookinst).subscribe(
      {
        next: (response) => {
          this.books.push(this.bookinst)
          this.getBooks();
          // console.log(this.books);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 

      }
    );

  }
attributeObject(book:Book){
  console.log(book);
  this.inputValueUpdated = book;
  this.toggleBlockUpdate();
  

}

  editBlock(book:Book){
    this.bookService.updateBook(book).subscribe(
      {
        next: (response) => {
          // this.books.push(this.bookinst)
          // this.getBooks();
          // console.log(this.books);
          this.getBooks();

        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 

      }
    );
  }

  public searchBooks(key: string): void {
    console.log(key);
    const results: Book[] = [];
    for (const book of this.books) {
      if (book.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(book);
      }
      else{
        this.books = [];

      }
    }
    this.books = results;
    if (results.length === 0 || !key) {
      this.getBooks();
    }
    
  }


  deleteBlock(book:Book) {
    console.log(book);
    this.bookService.deleteBook(book.id).subscribe(
      {
        next: (response) => {
          const index = this.books.findIndex((item) => item.id === book.id);

          // Remove the book from the array using splice
          if (index !== -1) {
            this.books.splice(index, 1);
          }        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 

      }
    );

  }

  toggleBlock() {
    this.hidenBlock = !this.hidenBlock;
  }

  toggleBlockUpdate(){
    this.hidenUpdateBlock = !this.hidenUpdateBlock;
    console.log('Button clicked!');
  }

  



  
  

  
  














  
}
