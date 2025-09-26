import { SquareLibrary } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function AuthForm({
  type,
  emailRef,
  passwordRef,
  onSubmit,
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <SquareLibrary className="size-6" />
              </div>
              <span className="sr-only">Polybook</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Polybook.</h1>
            {type === "register" ? (
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            ) : (
              <div className="text-center text-sm">
                Don’t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            )}

          
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                inputRef={emailRef}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                inputRef={passwordRef}
                placeholder="•••••••••••"
                required
              />
            </div>
            {type === "register" ? (
                          <Button type="submit" className="w-full cursor-pointer">
              Sign up
            </Button>
            ): (
                          <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
            )
            
            }
          </div>
        </div>
      </form>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
