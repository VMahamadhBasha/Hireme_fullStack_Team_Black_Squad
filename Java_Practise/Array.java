import java.util.Scanner;
public class Array {
    static void  Out(int c){
        System.out.print(c);

    }
    static void Print(int[] arr){
        for(int i=0;i<arr.length;i++){
                 System.out.print(arr[i]+" ");
        }
    }
    static float Sumofarray(int[] arr){
        float sum=0;
        for(int i=0;i<arr.length;i++){
                 sum +=arr[i];
        }
        return sum;
    }

    public static void main(String[] args) {
        int a[]=new int[5];
        Scanner sc=new Scanner(System.in);
        for(int i=0;i<a.length;i++){
            int v=sc.nextInt();
            a[i]=v;
        }
        Array.Print(a);
        System.out.println("\n"+Sumofarray(a));
        



    
}
}
