---
title: 'Life Saving Commands: nohup & disown'
date: 2014-05-09
author: baygunm
tags: linux. macosx, command, nohup, disown
---

## Why do we need <code>nohup</code> or <code>disown</code> ?

Sometimes while you' re developing, you need a job to continue running in the background even if you close the terminal. Sometimes you need a command running on a remote machine connected with ssh in a terminal window. Sometimes you start the command on the terminal and accidentally close the terminal. So you need to have a look at these commands: <code>nohup</code> and <code>disown</code>. You need these.

## <code>nohup</code>

This is a POSIX command. It's a short for  ' **NO**  **H** ang **UP** '. By using this command you tell the system to ignore the hangup signal for specified command.

### Without nohup

Let's test some commands:

```bash
% sleep 3600 &
```

This command will add a background job that waits for 3600 seconds. Why do we need that? We're just putting commands running on background.

You can see the command running by following command:

```bash
% ps -e -o pid,command | grep '[s]leep'
9826 sleep 3600
```

You can see a similar result with a different process id. Note the process id and close the terminal. When you open a new terminal re-write the command:

```bash
% ps -e -o pid,command | grep '[s]leep'
```

So no result? That's correct, your command got a hangup signal when you close the terminal and it's not running now.

### With <code>nohup</code>

When you need a command running in the background even if you close the terminal, you can simply write <code>nohup</code> before the command and go. If you already started the command, don't worry and wait for the <code>disown</code> section.

Let's use <code>nohup</code> now:

```bash
% nohup sleep 3600 &
[1] 10325
appending output to nohup.out
```

It runs in the background and writes the output to the file nohup.out by default. Check the command still running.

```bash
% ps -e -o pid,command | grep '[s]leep'
10325 sleep 3600
```

Did you note the process id? So let's close the terminal, open a new one and see what happens.

```bash
% ps -e -o pid,command | grep '[s]leep'
10325 sleep 3600
```

So you see it's still there running. So we're done with <code>nohup</code>.

Do not forget to quit the sleep job, because we don't need that now. This is how you can do that:

```bash
kill -s QUIT $(ps aux | grep '[s]leep' | awk '{print $2}')
```

This command gets the process ids for all sleep jobs and send them QUIT signal.

## What about <code>disown</code>?

After looking at <code>nohup</code>, let's look at <code>disown</code>. It is used to unbind a job from the current session. Let' s think about this scenario:

* You started a command that's taking too much time,
* you have to close the terminal,
* but you forgot to use <code>nohup</code>

It's bad for you, but wait! There's <code>disown</code> suitable for you. Ypu can use it.

Let's run our command:

```bash
% sleep 3600 &
% sleep 3600 &
```

Check them running in the background.

```bash
% ps -e -o pid,command | grep '[s]leep'
11661 sleep 3600
11666 sleep 3600
```

We already know that if we close terminal we will make them hangup. So take note about the process ids. And this command list the active jobs.

```bash
% jobs -l -p
[1]  - 11661 running    sleep 3600
[2]  + 11666 running    sleep 3600
```

You see the last command with a plus sign left. Let's use disown and see what happens.

```bash
% disown
```
When you check them you'll see both running on the background:

```bash
% ps -e -o pid,command | grep '[s]leep'
11661 sleep 3600
11666 sleep 3600
```

Let's see the active jobs again:

```bash
% jobs -l -p
[1]  + 11661 running    sleep 3600
```

You see the latest command is unbound from current session. If we close the terminal now and open a new terminal, we lose only the first command.
Let's close the terminal and open a new one and check that:

```bash
% ps -e -o pid,command | grep '[s]leep'
11666 sleep 3600
```

If you check the active jobs, you don't see any. Because the previous job is not bound to any sessions and continue working in the background.

```bash
jobs -l -p
```

Do not forget to quit the sleep job running in background, because we don't need that now:

```bash
kill -s QUIT $(ps aux | grep '[s]leep' | awk '{print $2}')
```

So I wish this commands will be helpful for you, too.