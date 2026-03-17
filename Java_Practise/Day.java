
import java.util.Scanner;
class Day{
    static void Out(String c){
        System.out.println(c);
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        switch((int)(n%7))
        {
            case 0:
                  Out("Sunday");
                   break;
            case 1:
                   Out("Monday");
                   break;
             case 2:
                   Out("Tuesday");
                   break;
             case 3:
                   Out("Wednessday");
                   break;
             case 4:
                   Out("Thursday");
                   break;
             case 5:
                   Out("Friday");
                   break;
             case 7:
                   Out("Saturday");
                   break;
            default:
                   break;
        }
    }
}