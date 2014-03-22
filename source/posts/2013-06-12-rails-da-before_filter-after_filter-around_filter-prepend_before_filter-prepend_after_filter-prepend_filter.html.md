---
title: Rails'da before_filter, after_filter, around_filter, prepend_before_filter, prepend_after_filter, prepend_filter
date: 2013-06-12
twitter: onurozgurozkan
tags:
  - after_filter
  - around_filter
  - before_filter
  - prepend_after_filter
  - prepend_before_filter
  - prepend_filter
---

Merhabalar,

Bu yazımızda aşağıdaki filterların kullanımına dair örnekler vereceğiz.

**before_filter**

    before_filter :b1, :b2

    # b1 --> b2 --> action

    before_filter :b1
    before_filter :b2

    # b1 --> b2 --> action


**before_filter + prepend_before_filter**

    before_filter :b1, :b2
    prepend_before_filter :b3

    # b3 --> b1 --> b2 --> action

    before_filter :b1, :b2
    prepend_before_filter :b3
    prepend_before_filter :b4

    # b4 --> b3 --> b1 --> b2 --> action

    before_filter :b1, :b2
    prepend_before_filter :b3, :b4

    # b3 --> b4 --> b1 --> b2 --> action


**after_filter**

    after_filter :a1, :a2

    # action --> a1 --> a2

    after_filter :a1
    after_filter :a2

    # action --> a1 --> a2


**after_filter + prepend_after_filter**

    after_filter :a1, :a2
    prepend_after_filter :a3

    # action --> a3 --> a1 --> a2

    after_filter :a1, :a2
    prepend_after_filter :a3
    prepend_after_filter :a4

    # action --> a4 --> a3 --> a1 --> a2

    after_filter :a1, :a2
    prepend_after_filter :a3, :a4

    # action --> a3 --> a4 --> a1 --> a2


**around_filter**

    around_filter :ar1, :ar2

    # ar1(before) --> ar2(before) -->
    # action -->
    # ar2(after) --> ar1(after)

    around_filter :ar1
    around_filter :ar2

    # ar1(before) --> ar2(before) -->
    # action -->
    # ar2(after) --> ar1(after)


**around_filter + prepend_around_filter**

    around_filter :ar1, :ar2
    prepend_around_filter :ar3

    # ar3(before) --> ar1(before) --> ar2(before) -->
    # action -->
    # ar2(after) --> ar1(after) --> ar3(after)

    around_filter :ar1, :ar2
    prepend_around_filter :ar3
    prepend_around_filter :ar4

    # ar4(before) --> ar3(before) --> ar1(before) --> ar2(before) -->
    # action -->
    # ar2(after) --> ar1(after) --> ar3(after) --> ar4(after)

    around_filter :ar1, :ar2
    prepend_around_filter :ar3, ar4

    # ar3(before) --> ar4(before) --> ar1(before) --> ar2(before) -->
    # action -->
    # ar2(after) --> ar1(after) --> ar4(after) --> ar3(after)


**before_filter + around_filter**

    before_filter :b1
    around_filter :ar1

    # b1 --> ar1(before) --> action --> ar1(after)

    before_filter :b1
    around_filter :ar1
    before_filter :b2

    # b1 --> ar1(before) --> b2 --> action --> ar1(after)

    before_filter :b1
    around_filter :ar1
    before_filter :b2
    around_filter :ar2

    # b1 --> ar1(before) --> b2 --> ar2(before) -->
    # action --> ar2(after) --> ar1(after)


    around_filter :ar1
    before_filter :b1

    # ar1(before) --> b1 --> action --> ar1(after)

    around_filter :ar1
    before_filter :b1
    around_filter :ar2
    before_filter :b2

    # ar1(before) --> b1 --> ar2(before) --> b2 -->
    # action --> ar2(after) --> ar1(after)


**prepend_before_filter + around_filter**

    around_filter :ar1
    prepend_before_filter :b1

    # b1 --> ar1(before) --> action --> ar1(after)

    around_filter :ar1
    prepend_before_filter :b1
    prepend_before_filter :b2

    # b2 --> b1 --> ar1(before) --> action --> ar1(after)

    around_filter :ar1
    prepend_before_filter :b1, :b2

    # b1 --> b2 --> ar1(before) --> action --> ar1(after)

    around_filter :ar1
    prepend_before_filter :b1
    around_filter :ar2
    prepend_before_filter :b2

    # b2 --> b1 --> ar1(before) --> ar2(before) -->
    # action --> ar2(after) --> ar1(after)


**before_filter + prepend_around_filter**

    before_filter :b1
    prepend_around_filter :ar1

    # ar1(before) --> b1 --> action --> ar1(after)

    before_filter :b1
    prepend_around_filter :ar1
    prepend_around_filter :ar2

    # ar2(before) --> ar1(before) --> b1 --> action --> ar1(after) --> ar2(after)

    before_filter :b1
    prepend_around_filter :ar1, :ar2

    # ar1(before) --> ar2(before) --> b1 --> action --> ar2(after) --> ar1(after)

    before_filter :b1
    prepend_around_filter :ar1
    before_filter :b1
    prepend_around_filter :ar2

    # ar2(before) --> ar1(before) --> b1 --> b2 -->
    # action --> ar1(after) --> ar2(after)


**prepend_before_filter + prepend_around_filter**

    prepend_before_filter :b1
    prepend_around_filter :ar1

    # ar1(before) --> b1 --> action --> ar1(after)

    prepend_around_filter :ar1
    prepend_before_filter :b1

    # b1 --> ar1(before) --> action --> ar1(after)


**after_filter + around_filter**

    after_filter :a1
    around_filter :ar1

    # ar1(before) --> action --> ar1(after) --> a1

    around_filter :ar1
    after_filter :a1

    # ar1(before) --> action --> ar1(after) --> a1

    after_filter :a1
    around_filter :ar1
    after_filter :a2

    # ar1(before) --> action --> ar1(after) --> a1 --> a2

    after_filter :a1
    around_filter :ar1
    after_filter :a2
    around_filter :ar2

    # ar1(before) --> ar2(before) --> action -->
    # ar2(after) --> ar1(after) --> a1 --> a2


**prepend_after_filter + around_filter**

    prepend_after_filter :a1
    around_filter :ar1

    # ar1(before) --> action --> ar1(after) --> a1

    around_filter :ar1
    prepend_after_filter :a1

    # ar1(before) --> action --> ar1(after) --> a1

    prepend_after_filter :a1
    around_filter :ar1
    prepend_after_filter :a2
    around_filter :ar2

    # ar1(before) --> ar2(before) --> action -->
    # ar2(after) --> ar1(after) --> a2 --> a1


**after_filter + prepend_after_filter**

    after_filter :a1
    prepend_around_filter :ar1
    after_filter :a2
    prepend_around_filter :ar2

    # ar2(before) --> ar1(before) --> action -->
    # ar1(after) --> ar2(after) --> a1 --> a2


**prepend_after_filter * prepend_around_filter**

    prepend_after_filter :a1
    prepend_around_filter :ar1
    prepend_after_filter :a2
    prepend_around_filter :ar2

    # ar2(before) --> ar1(before) --> action -->
    # ar1(after) --> ar2(after) --> a2 --> a1


Umarım sıralamayı anlamanıza yardımcı olmuştur.

