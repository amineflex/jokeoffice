import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JokeForm() {
  return (
    <div className="">
      <Card>
        <CardFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
