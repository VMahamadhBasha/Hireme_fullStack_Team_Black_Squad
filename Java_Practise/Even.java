
import java.util.Scanner;
class Even {
    static void Out(String c){
        System.out.println(c);
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        if (n%2==0){
           Out("Even");
            
        }
        else{
           Out("Odd");
        }
    }
}